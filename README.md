# Reduced state

This is a minimalistic implementation of redux.
It features:

- `combineReducers`.
- `dispatch`.
- `state`.
- `subscribe` / `unsubscribe`.

Nothing else.

## Motivations

It must run inside really tiny devices (IoT, smartwatches, etc.) where:

- You have to use ES5 compatible code.
- You have memory constraints: this module doesn't have _development_ features like runtime checks, warnings or errors. You're an experienced developer so you know how to use redux.
