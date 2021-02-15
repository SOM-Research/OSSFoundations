<template>
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <!-- EDITED TO DO SORTING LIST -->
          <th v-for="column in columns" v-bind:key="column">
            <div
              href="#"
              v-on:click="sortBy(column)"
              v-bind:class="{ active: sortKey == column }"
            >
              {{ column[0].toUpperCase() + column.slice(1) }}
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- EDITED VBIND KEY -->
        <tr v-for="foundation in foundations" v-bind:key="foundation.name">
          <td>
            <a
              data-toggle="collapse"
              v-bind:href="'#' + foundation.name.replace(/ /g, '').replace(/\./g, '')"
              role="button"
              aria-expanded="false"
              aria-controls="collapseTable"
            >
              {{ foundation.name }}
            </a>
            <div
              class="collapse collapse-foundation"
              v-bind:id="foundation.name.replace(/ /g, '').replace(/\./g, '')"
            >
              <div class="card card-body">
                <span class="card-item">Website:</span>
                <a v-bind:href="foundation.url" target="_blank">{{ foundation.url }}</a>
                <span class="card-item">Status Form:</span>
                {{ foundation.legal }}
                <table class="table table-sm">
                  <tr>
                    <th>Dimension</th>
                    <th>Result</th>
                  </tr>
                  <tr>
                    <td>Does it have an international scope?</td>
                    <td>{{ foundation.rq1Inter }}</td>
                  </tr>
                  <tr>
                    <td>Is it independent?</td>
                    <td>{{ foundation.rq1Indep }}</td>
                  </tr>
                  <tr>
                    <td>Is it transparent enough?</td>
                    <td>{{ foundation.rq1Open }}</td>
                  </tr>
                  <tr>
                    <td>Does it directly support software products?</td>
                    <td>{{ foundation.SD }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
//Import lodash
import _ from "lodash";

export default {
  components: {},
  name: "FoundationsList",
  props: ["foundationsProp"],
  data() {
    return {
      ///ORDERING
      columns: ["name"], // Columns of the table
      sortKey: "", // Order
      reverse: false, // If we have to reverse the order
   
      //DATA
      foundations: this.foundationsProp,
    };
  },

  watch: {
    //Watches if the foundations data has been changed and updates the value
    foundationsProp: {
      deep: true,
      handler(value) {
        this.foundations = value;
      },
    },
  },
  methods: {
    //Sorts the table alphabetically
    sortBy: function (sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;
      this.sortKey = sortKey;
      this.foundations = _.orderBy(
        this.foundations,
        this.sortKey,
        this.reverse ? "desc" : "asc"
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
