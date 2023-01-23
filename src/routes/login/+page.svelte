<script>
  /** @type {import('./$types').PageData} */
  //export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<form method="POST" action="?/login">

  {#if form?.credentials}<p class="error">The username & password field is required</p>{/if}

  <label>
    Username
    <input name="username" type="text" required>
  </label>
  <label>
    Password
    <input name="password" type="password" required>
  </label>
  <button>Log in</button>
</form>

{#if form?.success}
  <p>Successfully logged in! Welcome back</p>
  <form method="POST" action="?/logout">
    <button>logout</button>
  </form>
{/if}

