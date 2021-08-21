# Mapping Homework

The purpose of this homework is to do the following.

- Design a website that showcases a map using 3rd party providers
- Draw a polygon onto the map in any arbitrary area
- Calculate the nominal power of the drawn polygon

## Delivery

- App must be simple, intuitive and smooth user experience
- README file with how to configure and run
- Show approach through version control history

## Rules

- App must be compatible with modern broswers and mobile devices
- Allowed to use 3rd party libraries, APIs and code fragments, with citations
- Include minimal test suite for the application
- Justify decisions, assumptions and usage of 3rd party services or
- Comment code

## Bonus Optional Features

- Search for an address in the United States
- Enter tilt and orientation angles for the surface under the polygon and calculate the area of the polygon's projection on that plane.
- Connnect to a servie to estimate annual electricity production for the system.

## Overall design direction

I went ahead selected Sapper/Svelte for the creation of the website. A few reasons to go with this approach is ease of setting up the overall [project](https://sapper.svelte.dev/docs/). This allowed me to not focus on creating the webserver but the code and features.

Main.js, App.svelte, package.json, rollup.config.js are all created by cloning the default svelte project.

## References used
