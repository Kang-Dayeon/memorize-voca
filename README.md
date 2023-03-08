# Memorize VOCA📚

## Description
Memorize VOCA is made to learn English vocabulary.

You can learn vocabulary by level in the category and test the learned vocabulary.

## Stacks
* Environment
  - Visual Studio Code
  - github
  
* config
  - NPM
  
* Development
  - React
  - Recoil
  - React Router
  - React Hook Form
  - React Table
  - SCSS

## Requirements

* Node.js 16.17.0
* Npm 8.15.0
* React 18.2.0
* React-router-dom 6.8.1
* Recoil 0.7.6

## Installation
<pre>
<code>// ** start
$ npm install
$ npm start
  
// ** build
$ npm run build</code>
</pre>

## Main Function
1. Learning by category and level
2. Test your learned vocabulary
3. Adding and deleting your vocabularies
4. Check your learning history and test results on My Page
5. Wrong vocabulary relearning and then testing
6. You can create an account and sign in and sign out
7. Data is not deleted on refresh

## Architecture

<pre>
<code>
├─node_modules
├─public
└─src
    ├─assets
    │  └─scss
    │      ├─base
    │      ├─components
    │      │  ├─button
    │      │  ├─card
    │      │  ├─form
    │      │  ├─input
    │      │  ├─list
    │      │  ├─modal
    │      │  ├─slide
    │      │  └─table
    │      ├─helpers
    │      ├─layouts
    │      └─pages
    │          ├─common
    │          ├─mypage
    │          └─words
    ├─components
    │  ├─layouts
    │  ├─menu
    │  ├─modal
    │  ├─slide
    │  └─table
    ├─database
    ├─hooks
    ├─pages
    │  ├─auth
    │  │  ├─signIn
    │  │  ├─signUp
    │  │  └─store
    │  ├─mypage
    │  │  ├─relearning
    │  │  └─testResult
    │  └─words
    │      ├─addWord
    │      ├─hook
    │      ├─store
    │      └─wordCategory
    │          ├─memorize
    │          ├─steps
    │          └─test
    └─router
    </code>
    </pre>
