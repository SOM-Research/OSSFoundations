<template>
  <foundations-list :foundationsFiltered="foundationsFiltered" />
  <div class="col-6">
    <button
      class="btn btn-secondary btn-sm reset-btn"
      role="button"
      v-on:click="reset()"
      >Reset</button
    >
    <h2>Choose yours</h2>
    <form @submit.prevent v-on:change="filteredOrderedList()">
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
      <!--NATURE-->
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
      <!--ACTIVITIES-->
      <div class="form-question">
        <div class="form-group">
          <label>
            Should the foundation aim at supporting the development of specific open
            source projects?
          </label>
          <div class="btn-group btn-group-toggle" role="group" data-toggle="buttons">
            <label
              id="toggleSDTrue"
              class="btn btn-sm btn-secondary form-btn"
              v-bind:class="{ active: formSD == 'Y' }"
            >
              <input
                type="radio"
                name="toggleSD"
                value="true"
                v-bind:class="{ selected: formSD == 'Y' }"
                v-on:click="toggleSD(true)"
              />Yes</label
            >
            <label
              id="toggleSDFalse"
              class="btn btn-sm btn-secondary form-btn"
              v-bind:class="{ active: formSD == 'N' }"
            >
              <input
                type="radio"
                name="toggleSD"
                v-bind:class="{ selected: formSD == 'N' }"
                v-on:click="toggleSD(false)"
              />No</label
            >
          </div>
        </div>
        <div class="form-group">
          <label> Filter according to the activities developed by the foundation? </label>
          <div class="btn-group btn-group-toggle" role="group" data-toggle="buttons">
            <label class="btn btn-sm btn-secondary form-btn" :class="{ active: formTopics }">
              <input
                type="radio"
                name="toggleQ1topics"
                value="true"
                :class="{ selected: formTopics }"
                v-on:click="toggleQ1topics(true)"
              />Yes</label
            >
            <label class="btn btn-sm btn-secondary form-btn" :class="{ active: !formTopics }">
              <input
                type="radio"
                name="toggleQ1topics"
                :class="{ selected: !formTopics }"
                v-on:click="toggleQ1topics(false)"
              />No</label
            >
          </div>
        </div>
        <div
          class="collapse collapse-topics btn-group-toggle text-center"
          id="topics-list"
          role="group"
          data-toggle="buttons"
        >
          <label
            v-for="topic in topics"
            v-bind:key="topic"  
            class="btn btn-sm btn-secondary form-btn topic"
          >
            <input
              type="checkbox"
              name="toggleTopic"
              :value="topic"
              v-bind:class="{ selected: selectedTopics.indexOf(topic) > -1 }"
              v-on:click="toggleTopic(topic)"
            />{{ topic }}</label
          >
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
  <teleport to="#chart">
    <chart :chartData="chartData" />
  </teleport>
</template>

<script>
//Import jQuery
import $ from "jquery";

//Import lodash
import _ from "lodash";

//JSON
import foundations from "@/data/data.json";

import FoundationsList from "./FoundationsList.vue";
import Chart from "./Chart.vue";

export default {
  components: { Chart, FoundationsList },
  name: "Search",
  data() {
    return {
      //FILTERING
      search: "", // Keyword to search
      formTopics: false, // Answer for topics in the form
      formNatureInter: "", // Answer for Q1Inter "International scope" in the form
      formNatureIndep: "", // Answer for Q1Indep "Independent" in the form
      formNatureOpen: "", // Answer for Q1Open "Transparent" in the form
      formSD: "", // Answer for SD "Software Product Supporter" in the form
      topics: [], // List of keywords for non-software foundations
      selectedTopics: [], // Topics selected by the user

      //MAIN DATA
      foundations: foundations,
      foundationsFiltered: foundations,

      //CHART DATA
      chartData: {
        //"International scope" data
        rqNatureInterY: 0,
        rqNatureInterN: 0,
        //"Independent" data
        rqNatureIndepY: 0,
        rqNatureIndepN: 0,
        //"Transparent" data
        rqNatureOpenY: 0,
        rqNatureOpenN: 0,
        //"Software Product Supporter" data
        rqSDY: 0,
        rqSDN: 0,
      },
    };
  },

  mounted: function () {
    var self = this;

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
  },

  created: function () {
    //Call the function to update the chart the first time and refresh variables
    this.filteredOrderedList();
  },

  methods: {
    filteredOrderedList: function () {
      var self = this;

      var prefiltered = self.foundations;

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

      this.foundationsFiltered = ordered;

      //Building the data to render in the graph
      self.updateChart();

    },

    updateChart: function () {
      this.chartData.rqNatureInterY = this.foundationsFiltered.filter(function (f) {
        return f.rq1Inter == "Y";
      }).length;
      this.chartData.rqNatureInterN = this.foundationsFiltered.filter(function (f) {
        return f.rq1Inter == "N";
      }).length;
      this.chartData.rqNatureIndepY = this.foundationsFiltered.filter(function (f) {
        return f.rq1Indep == "Y";
      }).length;
      this.chartData.rqNatureIndepN = this.foundationsFiltered.filter(function (f) {
        return f.rq1Indep == "N";
      }).length;
      this.chartData.rqNatureOpenY = this.foundationsFiltered.filter(function (f) {
        return f.rq1Open == "Y";
      }).length;
      this.chartData.rqNatureOpenN = this.foundationsFiltered.filter(function (f) {
        return f.rq1Open == "N";
      }).length;
      this.chartData.rqSDY = this.foundationsFiltered.filter(function (f) {
        return f.SD == "Y";
      }).length;
      this.chartData.rqSDN = this.foundationsFiltered.filter(function (f) {
        return f.SD == "N";
      }).length;
    },
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
      this.filteredOrderedList();
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
      $(".topic").removeClass("active");
    },
    toggleTopic: function (topic) {
      var self = this;
      if (self.selectedTopics.indexOf(topic) == -1) {
        self.selectedTopics.push(topic);
        //Toggle the topic Software-Development and modifies its class to check/uncheck its button
        if (topic == "Software-Development") {
          self.formSD = "Y";
        }
      } else {
        self.selectedTopics = self.selectedTopics.filter(function (value) {
          return value != topic;
        });
        //Toggle the topic Software-Development and modifies its class to check/uncheck its button
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

      //If true
      if (answer) {
        self.formSD = "Y";
        self.selectedTopics.push("Software-Development");
        //Added the class "active" to the topic of Software-Development
        $("input[name=toggleTopic][value=Software-Development]")
          .parent()
          .addClass("active");
        //If false
      } else {
         //Removed the class "active" from the topic of Software-Development
        $("input[name=toggleTopic][value=Software-Development]")
          .parent()
          .removeClass("active");
        self.formSD = "N";
        //Remove the topic
        self.selectedTopics = self.selectedTopics.filter(function (value) {
          return value != "Software-Development";
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
