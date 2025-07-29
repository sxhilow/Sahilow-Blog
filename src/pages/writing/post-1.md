---
layout: "../../layouts/WritingLayout.astro"
title: "GitHub Auth: User Email Is Null Even with Scope 'user:email'"
description: "Blog on how to solve the issue of Github not returning the user email in passport.js, even with the scope 'user:email'"
date: "2025-07-29"
readTime: "3"
image:
  src: "/images/post-1/header.jpg"
  alt: "Github"
slug: "passportjs-github-auth-issue"
category: "Backend Development"
draft: false
featured: true
---

I was coding my new app today and wanted users to be able to log in using GitHub, pretty simple, right? Nope, Github hit me with `null` for the emails. 

As you can see in the image below (line 40), my `email` variable was returning as `null` even though I had set the scope to `user:email` in my route.
 

![Screenshot](/images/post-1/1.png)



### So what’s going on?

Turns out, GitHub doesn’t always return the email in the profile, even if you add `user:email` as a scope. If the user’s email is private or even public, GitHub just skips it for "security reasons".


### The soluction? You have to Fetch it yourself.

Below is the snippet I added inside my GitHub strategy:

```js
let email = null;        

// GitHub not providing email so explicitly fetch it
const res = await fetch("https://api.github.com/user/emails", {
  headers: {
    Authorization: `token ${accessToken}`
  }
});

const emails = await res.json();
```

Since github won't automatically provide us with the email we fetch it ourselves by calling the github email api using the aceesToken provided by possport.js into the Authorization header, and boom,  you should have all the user emails primary and non-primary.


And just like that, it works.