import Vue from 'vue'
import pdf from "vue-pdf";

export default function () {
  Vue.component('pdf', pdf)
  Vue.prototype.pdf = pdf
}
