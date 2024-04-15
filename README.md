# Thor Tea Cooler - ReactJS frontend client application

This is a ReactJS client webapplication for the [Thor Tea Cooler (TTC)](https://github.com/HodoArmand/thor-tea-cooler) IoT Device's API. The frontend code was built with the ReactJS+Vite SPA techstack. The application offers support for all hardware functions, login/auth pages and a GUI for device configuration with responsive webdesign and light/darkmode support.

![Screenshot - Light mode](https://github.com/HodoArmand/thor-tea-cooler-frontend-basic/blob/main/docs/ttcScreenshotLight.JPG)

![Screenshot - Dark mode](https://github.com/HodoArmand/thor-tea-cooler-frontend-basic/blob/main/docs/ttcScreenshotDark.JPG)

![Screenshot of a configurations page - Light mode](https://github.com/HodoArmand/thor-tea-cooler-frontend-basic/blob/main/docs/ttcScreenshotLightConfig.JPG)

# Build & Deploy Instructions

The project uses npm build tools for quick development, download and build the public CSS and JS files with:

```
npm run build
```

Then simply host the */dist* folder with any VPS service, with the *index.html* as entry point.

# Development tools

All available commands are:


*Build and preview developer mode at port 5173*
```
npm run dev
```
*Build production files to /dist*
```
npm run build
```
*Preview production mode at port 4173*
```
npm run preview
```

# Libraries and Resources used

The project utilizes [npm](https://www.npmjs.com/) for build tools. Styling is built with [tailwindCSS](https://tailwindcss.com/), [SVGInject](https://github.com/iconfu/svg-inject) is used for styleable svg images. Live temperature chart is built with [ChartJS](https://www.chartjs.org/). Promise based async HTTP requests are made with the amazing [Axios HTTP Client library](https://github.com/axios/axios). Free and open source web icons from [Tabler Icons](https://tabler-icons.io/).
