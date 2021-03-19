<template>
  <div class="container first-half">
    <!-- Chart container-->
    <div id="chart"></div>
  </div>
  <!-- container  first-half -->

  <div class="middle">
    <div class="container">
      <a
        data-toggle="collapse"
        href="#info"
        role="button"
        aria-expanded="false"
        aria-controls="collapseInfo"
      >
        <div class="text-right">
          Do you want to know more about the dimensions and the analysis? Click here!
        </div>
      </a>
      <div class="collapse" id="info">
        <div class="row">
          <div class="col-6">
            <h4>Dimensions</h4>
          </div>
          <!-- col-6 -->
          <div class="col-6">
            <h4>Analysis report</h4>
          </div>
          <!-- col-6 -->
        </div>
        <!-- row -->
        <div class="row">
          <div class="col-6">
            <li>
              <span class="font-weight-bold">International Scope</span>. This dimension
              studies the distribution of the foundations from a geographical point of
              view (i.e., whether the foundation has a international or local character).
            </li>
            <li>
              <span class="font-weight-bold">Independent</span>. Foundations can either
              serve a specific project, a set of projects or provide an umbrella for a
              number of smaller foundations that use it to simplify its own creation,
              management and legal processes. We focus on independent foundations (i.e.,
              neither umbrella nor subsidiary foundations).
            </li>
            <li>
              <span class="font-weight-bold">Transparent</span>. Beyond the development
              itself, foundations may aim to help the project on several aspects, like
              nurturing the community or facilitating the creation of new related
              projects. These goals are normally stated as part of the foundations'
              mission as mentioned either in the foundation website or in their bylaws.
              Surprisingly, a significant number of foundations did not provide any
              explicit information on their mission and goals.
            </li>
            <li>
              <span class="font-weight-bold">Software Product Supporter</span>. We check
              each foundation in our dataset to find out whether its main goal is to
              support the development of a specific set of software projects. Other goals
              could include: training, certification or evangelization of open source in
              general.
            </li>
          </div>
          <!-- col-6 -->
          <div class="col-2">
            <img src="@/img/papercover.jpg" alt="..." class="img-thumbnail" />
          </div>
          <!-- col-2 -->
          <div class="col-4">
            <p>
              This webpage presents and extended version of the results of our paper
              <span class="font-italic"
                >The Role of Foundations in Open Source Projects</span
              >, published at the
              <a
                href="https://www.icse2018.org/track/icse-2018-Software-Engineering-in-Society"
                target="_blank"
                >Software Engineering in Society track</a
              >
              of the
              <a href="https://www.icse2018.org/" target="_blank"
                >International Conference on Software Engineering</a
              >
              in 2018. The work was awarded with the
              <span class="font-weight-bold">best paper prize</span> of the track.
            </p>
            <p>
              The study presented in the paper has been extended to cover up to
              <span class="font-weight-bold">101 software foundations</span>. The study
              regarding the international scope, independent and transparent foundations
              has been extended to cover
              <span class="font-weight-bold">all the foundations of the dataset</span>.
              Additionally, the current results include the
              <span class="font-weight-bold">main activities</span> targeted by the
              foundations.
            </p>
            <p>
              More info can be found
              <a
                href="https://livablesoftware.com/study-open-source-foundations/"
                target="_blank"
                >here</a
              >.
            </p>
          </div>
          <!-- col-4 -->
        </div>
        <!-- row -->
      </div>
      <!-- collapse -->
    </div>
    <!-- container  -->
  </div>
  <!-- middle-->

  <div class="second-half">
    <div class="container">
      <div id="vue-table">
        <div class="row">
          <search />
        </div>
        <!-- vue-table -->
      </div>
      <!-- row -->
    </div>
    <!-- container -->
  </div>
  <!-- second-half -->

  <div class="footer">
    <div class="container">
      <p class="text-center">
        <a href="https://som-research.uoc.edu/" target="_blank">SOM Research Lab</a>.
        Website made by <a href="http://jlcanovas.es" target="_blank">@jlcanovas</a>
      </p>
    </div>
    <!-- container  -->
  </div>
  <!-- footer-->
</template>

<script>
//Components
import Search from "@/components/Search.vue";

export default {
  components: { Search },
  name: "Home",
  data() {
    return {};
  },

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
