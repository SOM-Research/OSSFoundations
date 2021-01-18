<template>
  <div class="col">
    <a
      class="btn btn-secondary btn-sm reset-btn"
      href="#"
      role="button"
      v-on:click="reset()"
      >Reset</a
    >
    <h2>Choose yours</h2>

    <form>
      <div class="form-question">
        <div class="form-group">
          <label for="nameFilter">Name</label>
          <input
            type="text"
            v-model="search"
            class="form-control form-control-sm"
            id="nameFilter"
          />
        </div>
      </div>
      <!--
            NATURE
          -->
      <div class="form-question">
        <div class="form-group">
          <label>
            Regarding the nature, please select the selection criteria which applies:
          </label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="natureCheck1"
              value="Inter"
              v-model="formNatureInter"
            />
            <label class="form-check-label" for="natureCheck1"
              ><abbr title="Select only those foundations having an international scope"
                >International Scope<img src="@/img/info.png" /></abbr
            ></label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="natureCheck2"
              value="Indep"
              v-model="formNatureIndep"
            />
            <label class="form-check-label" for="natureCheck2"
              ><abbr
                title="Select only foundations, that provide support to software proyects (they are not foundations of foundations)"
                >Independent<img src="@/img/info.png" /></abbr
            ></label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="natureCheck3"
              value="Open"
              v-model="formNatureOpen"
            />
            <label class="form-check-label" for="natureCheck3"
              ><abbr
                title="Select those foundations clearly stating their mission and goals"
                >Transparent<img src="@/img/info.png" /></abbr
            ></label>
          </div>
        </div>
      </div>
      <!--
            ACTIVITIES
          -->
      <div class="form-question">
        <div class="form-group">
          <label>
            Should the foundation aim at supporting the development of specific open
            source projects?
          </label>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-sm btn-secondary form-btn"
              v-bind:class="{ selected: formSD == 'Y' }"
              v-on:click="toggleSD(true)"
            >
              Yes
            </button>
            <button
              type="button"
              class="btn btn-sm btn-secondary form-btn"
              v-bind:class="{ selected: formSD == 'N' }"
              v-on:click="toggleSD(false)"
            >
              No
            </button>
          </div>
        </div>
        <div class="form-group">
          <label> Filter according to the activities developed by the foundation? </label>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-sm btn-secondary form-btn"
              v-bind:class="{ selected: formTopics }"
              v-on:click="toggleQ1topics(true)"
            >
              Yes
            </button>
            <button
              type="button"
              class="btn btn-sm btn-secondary form-btn"
              v-bind:class="{ selected: !formTopics }"
              v-on:click="toggleQ1topics(false)"
            >
              No
            </button>
          </div>
          <div class="collapse collapse-topics" id="topics-list">
            <p class="text-center">
              <!-- EDITED VBIND KEY -->
              <button
                v-for="topic in topics"
                v-bind:key="topic"
                type="button"
                class="btn btn-secondary btn-sm form-btn"
                v-bind:class="{ selected: selectedTopics.indexOf(topic) > -1 }"
                v-on:click="toggleTopic(topic)"
              >
                {{ topic }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>

    <div class="feedback">
      <div class="text-center font-weight-bold">Do you have any feedback?</div>
      <div class="text-center">
        Just visit our
        <a href="https://github.com/SOM-Research/OSSFoundations" target="_blank"
          >GitHub Project</a
        >
      </div>
    </div>
    <!-- feedback -->
  </div>
</template>

<script>
//Import jQuery
import $ from "jquery";

//Import C3
import "d3";
import c3 from "c3";

//Import lodash
import _ from "lodash";

//JSON
import foundations from "@/data/data.json";

export default {
  name: "Search",
  data() {
    return {
      // TABLE AND FILTERING/ORDERING
      columns: ["name"], // Columns of the table
      sortKey: "", // Order
      reverse: false, // If we have to reverse the order
      search: "", // Keyword to search
      selectedCategory: -1, // Category selected in the graph (as index)
      selectedCategoryValue: "", // Value on the category selected
      formNatureInter: "", // Answer for Q1Inter in the form
      formNatureIndep: "", // Answer for Q1Indep in the form
      formNatureOpen: "", // Answer for Q1Open  in the form
      formSD: "", // Answer for SD in the form
      formTopics: false, // Answer for topics in the form
      timer: 0, // Last timer created (to dealy the graph update)
      previousList: [], // Cached result to be used when clicking on the graph consecutively
      selectedTopics: [], // Topics selected

      // DATA
      // foundations: [], // List of foundations (MAIN DATA)
      foundations: foundations,
      topics: [], // List of keywords for non-software foundations
    };
  },
  mounted: function () {
    var self = this;
    // $.getJSON("data/data.json", function (json) {
    //   self.foundations = json;
    self.foundations.map(function (foundation) {
      var foundationTopics = foundation.topics;
      if (foundationTopics != "") {
        var topicArray = foundationTopics.split(",");
        topicArray.map(function (topic) {
          if (self.topics.indexOf(topic) == -1) {
            self.topics.push(topic);
          }
        });
      }
    });
    // });
  },

  computed: {
    filteredOrderedList: function () {
      var self = this;

      // Click on the graph apply filters consecutively (removed)
      var prefiltered = self.foundations;
      /*if(self.selectedCategory > -1) {
          prefiltered = self.previousList.filter(function(foundation) {
            return (self.selectedCategory > -1 ? self.mapCategoryValue(foundation, self.selectedCategory) == self.selectedCategoryValue : true)
          })
      }*/

      // Filtering according to keyword and form
      var filtered = prefiltered.filter(function (foundation) {
        return (
          foundation.name.toLowerCase().indexOf(self.search.toLowerCase()) !== -1 &&
          (self.formSD != "" ? foundation.SD == self.formSD : true) &&
          (self.formNatureInter ? foundation.rq1Inter == "Y" : true) &&
          (self.formNatureIndep ? foundation.rq1Indep == "Y" : true) &&
          (self.formNatureOpen ? foundation.rq1Open == "Y" : true)
        );
      });

      // Topic filtering
      if (self.formTopics) {
        filtered = filtered.filter(function (foundation) {
          if (self.selectedTopics.length == 0) return false;
          for (let i in self.selectedTopics)
            if (foundation.topics.indexOf(self.selectedTopics[i]) == -1) return false;
          return true;
        });
      }

      // Ordering
      var ordered = _.orderBy(filtered, self.sortKey, self.reverse ? "desc" : "asc");

      // We build the data to render in the graph
      var rqNatureInterY = ordered.filter(function (f) {
        return f.rq1Inter == "Y";
      }).length;
      var rqNatureInterN = ordered.filter(function (f) {
        return f.rq1Inter == "N";
      }).length;
      var rqNatureIndepY = ordered.filter(function (f) {
        return f.rq1Indep == "Y";
      }).length;
      var rqNatureIndepN = ordered.filter(function (f) {
        return f.rq1Indep == "N";
      }).length;
      var rqNatureOpenY = ordered.filter(function (f) {
        return f.rq1Open == "Y";
      }).length;
      var rqNatureOpenN = ordered.filter(function (f) {
        return f.rq1Open == "N";
      }).length;
      var rqSDY = ordered.filter(function (f) {
        return f.SD == "Y";
      }).length;
      var rqSDN = ordered.filter(function (f) {
        return f.SD == "N";
      }).length;

      var selected = [
        "selected",
        rqNatureInterY,
        rqNatureIndepY,
        rqNatureOpenY,
        rqSDY,
      ]; /*, rq3rq4Y]*/
      var unselected = [
        "unselected",
        rqNatureInterN,
        rqNatureIndepN,
        rqNatureOpenN,
        rqSDN,
      ]; /*, 0]*/

      // window.ApexCharts.exec("foundationsChart", "updateSeries", [
      //   {
      //     data: [40, 55, 65, 11],
      //   },
      // ]);

      self.updateChart(
        rqNatureInterY,
        rqNatureIndepY,
        rqNatureOpenY,
        rqSDY,
        rqNatureInterN,
        rqNatureIndepN,
        rqNatureOpenN,
        rqSDN
      );
      // self.foundationsChart.updateSeries([{
      //   data: [rqNatureInterY, rqNatureIndepY, rqNatureOpenY, rqSDY],
      // }])
      // this.series = [{
      //   data: [0, 0, 0, 12]
      // }]
      // self.timer = setTimeout(function (newColumns) {
      //   self.chart.load({ columns: [selected, unselected], unload: true });
      //   $(".collapse-foundation").collapse("hide");
      // }, 500);
      self.chart.load({ columns: [selected, unselected], unload: true });
      $(".collapse-foundation").collapse("hide");

      ///***/

      self.previousList = ordered;
      return ordered;
    },
  },

  methods: {
    reset: function () {
      var self = this;
      self.search = "";
      self.formSD = "";
      self.formNatureInter = "";
      self.formNatureIndep = "";
      self.formNatureOpen = "";
      self.selectedCategory = -1;
      self.selectedCategoryValue = "";
      $(".collapse-foundation").collapse("hide");
      self.resetTopics();
    },
    resetTopics: function () {
      var self = this;
      self.formTopics = false;
      $(".collapse-topics").collapse("hide");
      self.resetTopicList();
      $(".btn-topic").button("dispose");
    },
    resetTopicQuestion: function () {
      var self = this;
      self.formTopics = false;
      $("#topics-list").collapse("hide");
      self.resetTopicList();
    },
    resetTopicList: function () {
      var self = this;
      self.selectedTopics = [];
      $(".btn-topic").button("dispose");
    },
    getCategoryValue: function (foundation, category) {
      if (category == 0) return foundation.rq1;
      else if (category == 1) return foundation.rq1Inter;
      else if (category == 2) return foundation.rq1Indep;
      else if (category == 3) return foundation.rq1Inter;
      else if (category == 4) return foundation.rq3rq4;
    },
    mapCategoryValue: function (foundation, category) {
      var self = this;
      var value = self.getCategoryValue(foundation, category);
      if (value == "Y") return "selected";
      else if (value == "N") return "unselected";
      else if (value == "-") return "not applicable";
    },
    updateForm: function (category, categoryValue) {
      var self = this;
      if (category == 0) {
        if (categoryValue == "selected") self.formSD = "Y";
        else if (categoryValue == "unselected") self.formSD = "N";
      } else if (category == 1) {
        if (categoryValue == "selected") self.formNatureInter = true;
        else if (categoryValue == "unselected") self.formNatureInter = false;
      } else if (category == 2) {
        if (categoryValue == "selected") self.formNatureIndep = true;
        else if (categoryValue == "unselected") self.formNatureIndep = false;
      } else if (category == 3) {
        if (categoryValue == "selected") self.formNatureOpen = true;
        else if (categoryValue == "unselected") self.formNatureOpen = false;
      }
    },
    toggleTopic: function (topic) {
      var self = this;
      if (self.selectedTopics.indexOf(topic) == -1) {
        self.selectedTopics.push(topic);
        if (topic == "Software-Development") {
          self.formSD = "Y";
        }
      } else {
        self.selectedTopics = self.selectedTopics.filter(function (value) {
          //EDITED - ELIMINATED (value, *index, arr*)
          return value != topic;
        });
        if (topic == "Software-Development") {
          self.formSD = "N";
        }
      }
    },
    toggleQ1topics: function (show) {
      var self = this;
      if (show) {
        self.formTopics = true;
        $("#topics-list").collapse("show");
      } else {
        self.formTopics = false;
        $("#topics-list").collapse("hide");
        self.resetTopicQuestion();
      }
    },
    toggleSD: function (answer) {
      var self = this;
      if (answer) {
        self.formSD = "Y";
        self.selectedTopics.push("Software-Development");
      } else {
        self.formSD = "N";
        self.selectedTopics = self.selectedTopics.filter(function (value) {
          //EDITED - ELIMINATED (value, *index, arr*)
          return value != "Software-Development";
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
