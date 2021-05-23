# yappaAmeWallpaper

やっぱり雨は降るんだね Themed web wallpaper. support various wallpaper clients like Wallpaper Engine.

You can download wallpaper from [here](https://steamcommunity.com/sharedfiles/filedetails/?id=2038274232).

For fetching weather based on the location, this project uses [MET Norway Weather API](https://api.met.no/).

## Use it on other client

If you want to use wallpaper on other desktop wallpaper client like [Plash](https://github.com/sindresorhus/Plash), try this [web version](https://yappa-ame-wallpaper.vercel.app/).

### Available URL Params

| Key          | Description                                           | Type    | Default |
| ------------ | ----------------------------------------------------- | ------- | ------- |
| background   | Background Image URL. (https)                         | boolean | true    |
| blur         | Whether to use blurring background image.             | boolean | true    |
| logo         | Whether to use background logo on center.             | boolean | true    |
| slideDelay   | Delay between logo slide. (ms)                        | number  | 20000   |
| rain         | Defines max rains.                                    | number  | 600     |
| rainSpeed    | Defines speed of rain.                                | number  | 3       |
| info         | Whether to use clock, weather information widget.     | boolean | false   |
| seconds      | Whether to show seconds on clock.                     | boolean | true    |
| infoPosition | Position of clock, weather widget. (1-4)              | number  | 4       |
| fahrenheit   | Whether to use Fahrenheit unit on weather widget.     | boolean | false   |
| ripple       | Whether to use ripple animation on page click.        | boolean | false   |
| latlon       | Custom Latitude, longitude coordinate. (XX.XX, XX.XX) | string  | -       |

You can use it like these examples:

https://yappa-ame-wallpaper.vercel.app/?blur=false&logo=false&info=true - No blur, No Logo, Show widgets.

https://yappa-ame-wallpaper.vercel.app/?blur=false&logo=false&info=true&latlon=37.532600,%20127.024612 - No blur, No Logo, Show widgets, Set Lat/Lon to Seoul.

https://yappa-ame-wallpaper.vercel.app/?info=true&latlon=37.532600,%20127.024612 - Show widgets, Set Lat/Lon to Seoul.

https://yappa-ame-wallpaper.vercel.app/?background=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1524275804141-5e9f2bc5a71d%3Fixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26ixlib%3Drb-1.2.1%26auto%3Dformat%26fit%3Dcrop%26w%3D1950%26q%3D80&blur=false&logo=false&info=true&latlon=37.532600,%20127.024612 - Set background to sea, No Blur, No Logo, Show widgets, Set Lat/Lon to Seoul.


You need to encode background parameter's URL when URL string contains specialized character.

## Build

```sh
yarn
```

First, download dependencies by typing above command on your terminal. You need [yarn package manager](https://yarnpkg.com/) to install dependencies.

Run following command

```sh
webpack
```

or

```sh
webpack --watch
```

to build.
