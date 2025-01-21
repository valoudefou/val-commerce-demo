<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="350"/>

# AB Tasty React Next.js SPA App

This app demonstrates AB Tasty's feature experimentation capabilities and product recommendation engine on a front-end e-commerce platform built as a single-page application (SPA) with server-side rendering (SSR). The goal is to dynamically enable features and recommendation logic by leveraging user context. User context includes details such as geolocation (e.g., "location" equals "UK") or user attributes (e.g., "visitor" equals "returning"), enabling personalized and targeted experiences.

## Features

The following features will display in real time when the user meets the targeting criteria:

### Shipping Fee

| Flag | Type | Value    | User Context    |
| :---: | :---:   | :---: | :---: |
| The value can be defined in AB Tasty `flagDeliveryFeeDpd`   | `integer` | `7.99` or any `number`   | key `user` value `retuning` configured   |

### Demonstration

Configuration in AB Tasty:

<img src="https://assets-manager.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167/config1.gif" alt="Shipping fee flag configuration in AB Tasty" width="950"/>

Outcome:

<img src="https://assets-manager.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167/ezgif-4-10839796ee.gif" alt="AB Tasty shipping fee flag demonstration" width="650"/>