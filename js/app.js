/*
 * Website for OSS Foundations study
 *
 * Author: Javier Canovas (me@jlcanovas.es)
 *
*/


let vm = new Vue({
  el: '#vue-table',
  
  data: {
    // TABLE AND FILTERING/ORDERING
    columns: ['name'],         // Columns of the table
    sortKey: '',               // Order
    reverse: false,            // If we have to reverse the order
    search: '',                // Keyword to search
    selectedCategory: -1,      // Category selected in the graph (as index)
    selectedCategoryValue: '', // Value on the category selected
    formQ1: '',                // Answer for Q1 in the form
    formQ1topics: false,       // Answer for Q1 topics in the form
    formQ2geo: '',             // Answer for Q2GEO in the form
    formQ2cov: '',             // Answer for Q2COV in the form
    formQ2mis: '',             // Answer for Q2MIS in the form
    timer: 0,                  // Last timer created (to dealy the graph update)
    previousList: [],          // Cached result to be used when clicking on the graph consecutively
    selectedTopics: [],        // Topics selected

    // GRAPH
    chart: undefined,          // The C3 graph

    // DATA
    foundations: [],           // List of foundations (MAIN DATA)
    topics: []                 // List of keywords for non-software foundations
  },
  
  mounted: function() {
    var self = this
    $.getJSON('data/data.json', function(json) {
      self.foundations = json

      self.foundations.map(function(foundation) {
        foundationTopics = foundation.topics
        if(foundationTopics != "") {
          topicArray = foundationTopics.split(",")
          topicArray.map(function(topic) {
            if(self.topics.indexOf(topic) == -1) {
              self.topics.push(topic)
            } 
          })          
        }
      })
    })  

  },

  computed: {
    filteredOrderedList : function() {
      var self = this
      
      // Click on the graph apply filters consecutively
      var prefiltered = self.foundations
      if(self.selectedCategory > -1) {
          prefiltered = self.previousList.filter(function(foundation) {
            return (self.selectedCategory > -1 ? self.mapCategoryValue(foundation, self.selectedCategory) == self.selectedCategoryValue : true)
          })
      }

      // Filtering according to keyword and form
      var filtered = prefiltered.filter(function(foundation) {
        return foundation.name.toLowerCase().indexOf(self.search.toLowerCase()) !== -1 &&
               (self.formQ1 != '' ? foundation.rq1 == self.formQ1 : true) &&
               (self.formQ2geo ? foundation.rq2geo == 'Y' : true) &&
               (self.formQ2cov ? foundation.rq2cov == 'Y' : true) &&
               (self.formQ2mis ? foundation.rq2mis == 'Y' : true) 
      })

      // Topic filtering
      if(self.formQ1topics) {
        filtered = filtered.filter(function(foundation) {
          if(self.selectedTopics.length == 0) return false
          for(i in self.selectedTopics) 
            if(foundation.topics.indexOf(self.selectedTopics[i]) == -1)
              return false
          return true
        })
      }

      // Ordering
      var ordered = _.orderBy(filtered, self.sortKey, (self.reverse ? 'desc' : 'asc'))

      // We build the data to render in the graph
      var rq1Y     = ordered.filter(function(f) { return f.rq1 == "Y";}).length
      var rq1N     = ordered.filter(function(f) { return f.rq1 == "N";}).length
      var rq2geoY  = ordered.filter(function(f) { return f.rq2geo == "Y";}).length
      var rq2geoN  = ordered.filter(function(f) { return f.rq2geo == "N";}).length
      var rq2covY  = ordered.filter(function(f) { return f.rq2cov == "Y";}).length
      var rq2covN  = ordered.filter(function(f) { return f.rq2cov == "N";}).length
      var rq2misY  = ordered.filter(function(f) { return f.rq2mis == "Y";}).length
      var rq2misN  = ordered.filter(function(f) { return f.rq2mis == "N";}).length
      /*var rq3rq4Y  = ordered.filter(function(f) { return f.rq3rq4 == "Y";}).length
      var rq3rq4NA = ordered.filter(function(f) { return f.rq3rq4 == "-";}).length*/

      selected   = ["selected", rq1Y, rq2geoY, rq2covY, rq2misY] /*, rq3rq4Y]*/
      unselected = ["unselected", rq1N, rq2geoN, rq2covN, rq2misN]/*, 0]*/

      self.timer = setTimeout(function(newColumns) {
        self.chart.load({ columns: [selected, unselected], unload: true })
        $('.collapse-foundation').collapse('hide')
      }, 500)
      
      self.previousList = ordered
      return ordered
    }
  },

  created: function() {
    var self = this
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['selected', 65, 47, 51, 37],/*, 18],*/
          ['unselected', 24, 18, 14, 28]/*, 0]*/
        ],
        type: 'bar',
        onclick: function (d, element) { 
          self.selectedCategory = d.index;
          self.selectedCategoryValue = d.name;
          self.updateForm(d.index, d.name);
        },
      },
      axis : {
        x : {
          type: 'category',
          categories : [
            'Software Product Supporter', 
            'International Scope', 
            'Independent', 
            'Clear mission'/*, */
            /*'Selected'*/
          ]
        }
      }
    });
  },

  methods: {
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
      this.sortKey = sortKey;
    },
    reset: function() {
      var self = this
      self.search = ''
      self.formQ1 = ''
      self.formQ2geo = ''
      self.formQ2cov = ''
      self.formQ2mis = ''
      self.selectedCategory = -1
      self.selectedCategoryValue = ''
      $('.collapse-foundation').collapse('hide')
      self.resetTopics()
    },
    resetTopics: function() {
      var self = this
      self.formQ1topics = false
      $('.collapse-topics').collapse('hide')
      self.resetTopicList()
      $('.btn-topic').button('dispose')
    },
    resetTopicQuestion: function() {
      var self = this
      self.formQ1topics = false
      $('#topics-list').collapse('hide')
      self.resetTopicList()
    },
    resetTopicList: function() {
      var self = this
      self.selectedTopics = []
      $('.btn-topic').button('dispose')
    },
    getCategoryValue: function(foundation, category) {
      if(category == 0) return foundation.rq1;
      else if(category == 1) return foundation.rq2geo;
      else if(category == 2) return foundation.rq2cov;
      else if(category == 3) return foundation.rq2mis;
      else if(category == 4) return foundation.rq3rq4;
    },
    mapCategoryValue: function(foundation, category) { 
      var self = this
      var value = self.getCategoryValue(foundation, category);
      if(value == "Y") return "selected";
      else if(value == "N") return "unselected";
      else if(value == "-") return "not applicable";
    },
    updateForm: function(category, categoryValue) {
      var self = this
      if(category == 0) {
        if(categoryValue == "selected") self.formQ1 = 'Y'
        else if(categoryValue == "unselected") self.formQ1 = 'N'
      }
      else if(category == 1) {
        if(categoryValue == "selected") self.formQ2geo = true
        else if(categoryValue == "unselected") self.formQ2geo = false
      }
      else if(category == 2) {
        if(categoryValue == "selected") self.formQ2cov = true
        else if(categoryValue == "unselected") self.formQ2cov = false
      }
      else if(category == 3) {
        if(categoryValue == "selected") self.formQ2mis = true
        else if(categoryValue == "unselected") self.formQ2mis = false
      }
    },
    toggleTopic: function(topic) {
      var self = this
      if(self.selectedTopics.indexOf(topic) == -1) {
        self.selectedTopics.push(topic)
      } else {
        self.selectedTopics = self.selectedTopics.filter(function(value, index, arr){
          return value != topic;
        });
      }
    },
    toggleQ1topics: function(show) {
      var self = this
      if(show) {
        self.formQ1topics = true
        $('#topics-list').collapse('show')
      } else {
        self.formQ1topics = false
        $('#topics-list').collapse('hide')
        self.resetTopicQuestion()
      }
    },
    toggleQ1: function(answer) {
      var self = this
      if(answer) {
        self.formQ1 = 'Y'
        self.resetTopics()
      } else {
        self.formQ1 = 'N'
        $('#topics-question').collapse('show')
      }
    }
  }
})
