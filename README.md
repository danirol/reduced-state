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
- You have memory constrains: this module doesn't have development features nor warnings or errors. You're an experienced developer so you know how to use work with redux.
