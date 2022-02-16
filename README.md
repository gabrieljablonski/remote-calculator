# Remote calculator REST API

This API exposes endpoints for doing simple math calculations.

## Endpoints
### Calculations

```
POST /v1/calculation/sum
POST /v1/calculation/subtract
POST /v1/calculation/multiply
POST /v1/calculation/divide
GET /v1/calculation/:id
```

The first 4 calculation endpoints accept exactly two arguments, `a` and `b`, which represent the arguments for the calculation. Sample JSON input:

```json
{
  "a": 17.3,
  "b": -3
}
```

These endpoints will return a `calculation` object containing the result of the operation.
`calculation` matching the interface:

```ts
{
  id: string; // a unique id representing the calculation
  args: number[]; // the calculation argument list (always `[a, b]` in this case)
  operation: 'SUM' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE'; // the operation executed
  result: number | null; // the result of the operation. is `null` when an error occurs
  error: 'DIVIDE_BY_ZERO' | null; // indicates an error ocurred (currently only division by zero)
}
```

Sample calculation output:

```ts
{
  "calculation": {
    "args": [
      13.2,
      17.3
    ],
    "operation": "SUM",
    "result": 30.5,
    "error": null,
    "id": "620c458b77171e19a630998f"
  }
}
```

The last endpoint is used to validate a previously made calculation, using the `calculation.id` field.

### Settings

```
POST /v1/settings/reload
```

This endpoint can be used to hotload changes to the configurationg in a `.env` file.

## Running

After installing dependencies with `yarn install`, tests can be run with `yarn test`.
The project can be built with `yarn build`.

Inside the build folder, after making the necessary changes to the `ormconfig.json` and the `.env` (see [`.env.sample`](./.env.sample)) files, the server can be run with `node index.js` (make sure the database service is running).


## Logging

If enabled, the HTTP CSV logs are presented in the following format (calculation id is always `'-'` on requests to endpoints that do not perform a calculation):

```
<datetime>,<client address>,<http method>,<endpoint url>,<http status code>,<calculation id>,<request time>
```
