# Astro Dump

The `Dump` component for Astro provides a better debugging experience than the inbuilt `Debug` component. It is built on top of [@poppinss/dumper](https://github.com/poppinss/dumper).

## Installation and setup

Install the package from the npm packages registry.

```sh
npm i astro-dump
```

Register the integration inside the `astro.config.(mjs|js|ts)` file.

```ts
import dumper from 'astro-dump'

export default defineConfig({
  integrations: [
    // Other integrations
    dumper({
      command: 'dev'
    })
  ],
});
```

The `dumper` integration injects global `style` and `script` tags to the head of the document. These are needed to add the collapse/expand integration in the dumped output and for some global styles. Feel free to audit the contents of these tags.

By default, the `style` and `script` tags are created only when you start the app via the `dev` command. However, you can specify one of the following options.

- `dev`: Inject when project is executed with `astro dev`.
- `build`: Inject when project is executed with `astro build`.
- `preview`: Inject when project is executed with `astro preview`.
- `always`: Inject always regardless of the used command.

## Using the Dump component
After the integration has been registered, you can use the `Dump` component as follows. 

> !Note
> The `Dump` component works only with server-rendered components and not the client-side components.

```astro
---
import { Dump } from 'astro-dump/components'
---

<Dump value={{ id: 1, name: 'virk', posts: [{ id: 1 }, { id: 2 }] }} />
```

### Passing options

You can configure the Dump output using the `config` prop. The config prop accepts the same config as it is accepted by the `@poppinss/dumper` [html formatter]() (except `styles` and `head`).

```astro
<Dump
  value={value}
  config={{
    depth: 10,
    inspectObjectPrototype: true,
    inspectArrayPrototype: true,
  }}
/>
```

### Switching themes
You may switch betwen themes using the `theme` prop. The value can be a string identifier for one of the inbuilt themes or an object containing the theme styles.

```astro
<Dump
  value={value}
  config={{
    depth: 10,
    inspectObjectPrototype: true,
    inspectArrayPrototype: true,
  }}
  theme="catppuccin"
/>
```

```astro
<Dump
  value={value}
  config={{
    depth: 10,
    inspectObjectPrototype: true,
    inspectArrayPrototype: true,
  }}
  theme={{
    // styles for all the tokens
  }}
/>
```