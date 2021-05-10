<template>
  <div class="container half first-half">
    <!-- Chart container-->
    <div class="intro-web">
      <h1 class="title-web">Analysis of Open Source Foundations</h1>
      <div class="row d-flex flex-row-reverse">
        <div class="col-12 col-md-12 col-lg-5 col-xl-6">
          <img class="w-100 mb-5" src="../img/landing-pic.png" aria-hidden="true" />
        </div>
        <div class="col-12 col-md-12 col-lg-7 col-xl-6">
          <p>Welcome! This website collects a list of existing Software Foundations.</p>
          <p>
            You will find a thorough analysis of the role of Foundations in Open Source
            projects. We currently have analyzed more than 100 Software Foundations but
            our list is always growing. Feel free to contribute those foundations that we
            may have missed.
          </p>

          <p>
            You can search directly on our Foundation browser of access the data via an
            OpenAPI-compatible API.
          </p>
          <a class="btn btn-dark m-1 mb-4" href="#chart">Start searching</a>
          <a class="btn btn-dark m-1 mb-4" href="#search-form">Our API</a>
        </div>
      </div>
    </div>
  </div>

  <!-- container  first-half -->
  <div class="middle half" id="what-we-did">
    <div class="container">
      <div class="" id="info">
        <h2 class="h1 mb-4">What we did</h2>
        <div class="info-block">
          <h3 class="mb-4">Analysis report</h3>
          <div class="row">
            <div class="col-12 col-md-4 col-xl-2">
              <img src="@/img/papercover.jpg" alt="..." class="img-thumbnail" />
            </div>
            <div class="col-12 col-md-8 col-xl-10">
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
          </div>
        </div>

        <hr class="solid" />
        <div class="info-block">
          <h3 class="mb-4">Dimensions</h3>
          <div>
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
        </div>
      </div>
    </div>
  </div>
  <!-- middle-->
  <div class="container pt-5">
    <div id="chart"></div>
  </div>

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

<style scoped>
.half {
  display: flex;
  align-items: center;
}

.first-half {
  margin-top: 5em;
}
.intro-web {
  /* background-image: url("../img/background-home.jpg");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  background-size: 32em; */
}
.title-web {
  margin-bottom: 1em;
}
h1 {
  color: #397c89;
  font-size: 3em;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  word-wrap: break-word;
  white-space: normal;
}

.info-block {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
