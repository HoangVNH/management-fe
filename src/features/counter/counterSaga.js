import { fork } from 'redux-saga/effects';

function* counter() {
  // console.log('Hello world');
}

export default function* counterSaga() {
  yield fork(counter);
}