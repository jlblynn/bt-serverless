<script>
  /** @type {import('./$types').PageData} */
  //export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<form method="POST" action="?/login">

  {#if form?.missing}<p class="error">The email field is required</p>{/if}

  <label>
    Email
    <input name="email" type="email">
  </label>
  <label>
    Password
    <input name="password" type="password">
  </label>
  <button>Log in</button>
</form>

{#if form?.success}
  <p>Successfully logged in! Welcome back, {form?.email}</p>
  <form method="POST" action="?/logout">
    <button>logout</button>
  </form>
{/if}

