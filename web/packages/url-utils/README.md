# Gravatar Url Utils

A set of utility function to generate Gravatar Avatar or Profile URLs.


## Quickstart

### Installation

Add the package to your project:

```sh
npm install @gravatar-com/url-utils
```

### Usage

```js
import { avatarUrl } from '@gravatar-com/url-utils';

avatarUrl('gravatar@automattic.com')
// https://www.gravatar.com/avatar/05bf27a328d0a17f66c91f9b42a4a0185c03152139fc5f0746fc3095d50e6ade

avatarUrl('gravatar@automattic.com', {size: 500})
// https://www.gravatar.com/avatar/05bf27a328d0a17f66c91f9b42a4a0185c03152139fc5f0746fc3095d50e6ade?size=500

avatarUrl('gravatar@automattic.com', {size: 500, default: "robohash" })
// https://www.gravatar.com/avatar/05bf27a328d0a17f66c91f9b42a4a0185c03152139fc5f0746fc3095d50e6ade?size=500&default=robohash
```

Check out the [unit tests if you want to see more examples](tests/index.test.ts).

### Example React component

Example use with a React component:

```js
import { avatarUrl } from "@gravatar-com/url-utils";
import PropTypes from "prop-types";

const Gravatar = ({ email, size }) => {
  return (
    <img
      src={avatarUrl(email, size ? { size: size } : null)}
      alt="User Avatar"
      width={size}
      height={size}
    />
  );
};

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Gravatar;
```

Use it like this:

```jsx
<Gravatar email="gravatar@automattic.com" />
<Gravatar email="gravatar@automattic.com" size={500} />
```

### Methods

```js
avatarUrl(email, options: GravatarOptions)
```

```js
profileUrl(email, format: GravatarFormat)
```

## Contribute


### Build

```sh
npm run build
```

### Run tests

```sh
npm run test
```
