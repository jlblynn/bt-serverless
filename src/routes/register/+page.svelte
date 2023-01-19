<script lang="ts">
  import { createUser, logIn } from "../../realmFunctions";

  let username: string;
  let email: string;
  let password: string;

  async function register() {
    try {
      await createUser(email, password);
      const user = await logIn(email, password);
      if (user) {
        console.log("Logged in: " + {user})
        return
      } else {
        console.log("Error logging in...")
        return
      }
    } catch (err: any) {
      console.log("Error creating user", err.message);
    }
  }

</script>

<div>
  <input type="text" placeholder="enter a username" bind:value={username}>
  <input type="email" placeholder="enter email" bind:value={email}>
  <input type="password" placeholder="enter a password" bind:value={password}>
  <button on:click={register}>Submit</button>
</div>