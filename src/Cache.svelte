<script>
  export let name, link, difficulty, terrain, size;
</script>

<div>
  <h1>
    <a href={link}>{name}</a>
  </h1>

  D: {difficulty} | T: {terrain} | S: {size}
</div>

<style>
  a {
    color: #7582fd;
    text-decoration: none;
  }
</style>
