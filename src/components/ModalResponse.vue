<template>
  <div
    class="modal fade"
    id="modalResponse"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalResponse"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <p>{{ responseAction }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalResponse",
  created() {},
  data() {
    return {};
  },
  props: ["responseAction"],
  methods: {},
};
</script>

<style scoped>
.modal-body p {
  color: #212529 !important;
}
</style>
