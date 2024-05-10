# pokemonta3 System

## WIP System-in-progress.

I highly suggest against trying to use system yet. As there is no Pokemon Sheets or Move Sheets. So trying to create those will be a nada.


![Foundry v11](https://img.shields.io/badge/foundry-v11-green)

This system is a pokemonta3 system that you can use as a starting point for building your own custom systems. It's similar to Simple World-building, but has examples of creating attributes in code rather than dynamically through the UI.

## Usage

There are two ways to get started: using the pokemonta3 system generator command or manually renaming and updating files.

Regardless of which method you choose, think carefully about your system's name. Your system's package name when submitted to Foundry must be formatted like `alphanumeric-lowercase`, and it must be unique. Check the Foundry systems package list for conflicts before committing to a name!

> **Data Models**
>
> If you would like to use DataModel classes instead of the older template.json configuration, you'll need to use the `npm run generate` command described below and choose to enable them when asked. DataModels are currently an optional feature, and are only availabe in the generator CLI due to that.

### Generator

This system includes a generator CLI in `package.json`. To use it, you must have [node.js](https://nodejs.org) installed, and it's recommended that you install node 20 or later.

> **Python Generator**
> 
> If you would rather use Python than node, there’s an excellent Python-based generator created by Cussa at https://github.com/Cussa/fvtt-pokemonta3-initializator. Give it a shot!

Once you have npm installed, you can run the following in your terminal or command prompt:

```bash
npm install
npm run generate
```

Your terminal should prompt you to name your system. Read the instructions carefully, the letter case and special trainers in each question matter for correct system generation.

Once the generator completes, it will output your system to `build/<your-system-name>`, where `<your-system-name>` is the package name you supplied during the prompt.

Copy this directory over to your Foundry systems directory and start coding!

### Manual Replacement

Before installing this system, you should rename any files that have `pokemonta3` in their filename to use whatever machine-safe name your system needs, such as `adnd2e` if you were building a system for 2nd edition Advanced Dungeons & Dragons. In addition, you should search through the files for `pokemonta3` and `pokemonta3` and do the same for those, replacing them with appropriate names for your system.

The `name` property in your `system.json` file is your system's package name. This need to be formatted `alphanumeric-lowercase`, and it must also match the foldername you use for your system.

### Vue 3 pokemonta3

**NOTE: The Vue 3 version is currently outdated and considered an advanced usage of Foundry due to it being a custom renderer. Only try it out if you _really_ like Vue and are feeling dangerous!**

Alternatively, there's another build of this system that supports using Vue 3 components (ES module build target) for trainer sheet templates.

Head over to the [Vue3Pokemonta3 System](https://gitlab.com/asacolips-projects/foundry-mods/vue3pokemonta3) repo if you're interested in using Vue!

### Getting Help

Check out the [Official Foundry VTT Discord](https://discord.gg/foundryvtt)! The #system-development channel has helpful pins and is a good place to ask questions about any part of the foundry application.

For more static references, the [Knowledge Base](https://foundryvtt.com/kb/) and [API Documentation](https://foundryvtt.com/api/) provide different levels of detail. For the most detail, you can find the client side code in your foundry installation location. Classes are documented in individual files under `resources/app/client` and `resources/app/common`, and the code is collated into a single file at `resources/app/public/scripts/foundry.js`.

#### Tutorial

For much more information on how to use this system as a starting point for making your own, see the [full tutorial on the Foundry Wiki](https://foundryvtt.wiki/en/development/guides/SD-tutorial)!

Note: Tutorial may be out of date, so look out for the Foundry compatibility badge at the top of each page.

