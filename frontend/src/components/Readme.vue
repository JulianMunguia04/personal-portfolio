<script setup>
import { ref, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const props = defineProps({
  owner: String,
  repo: String
});

const markdown = ref("");
const renderedHtml = ref("");

const md = new MarkdownIt();

onMounted(async () => {
  const res = await fetch(`/api/readme/${props.owner}/${props.repo}`);
  const data = await res.json();

  markdown.value = data.markdown;
  renderedHtml.value = DOMPurify.sanitize(md.render(markdown.value));
});
</script>

<template>
  <div class="readme-container" v-html="renderedHtml"></div>
</template>

<style scoped>
  .readme-container {
    max-width: 800px;
    margin: auto;
    line-height: 1.6;
  }

  .readme-container h1,
  .readme-container h2 {
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.3em;
  }

  .readme-container pre {
    background: #1e1e1e;
    color: white;
    padding: 1rem;
    overflow-x: auto;
  }
</style>