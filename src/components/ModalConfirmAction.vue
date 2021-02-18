<template>
  <div
    class="modal fade"
    id="modalConfirmAction"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirm delete</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <p>Are you sure do you want to delete this foundation?</p>
          <p class="font-weight-bold">{{ foundation.name }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('confirmed-action')"
            data-dismiss="modal"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirmAction",
  created() {},
  data() {
    return {
      confirmDeleteAction: false,
    };
  },
  props: ["foundation"],
  methods: {},
};
</script>

<style lang="scss" scoped></style>
