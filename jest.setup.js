// Project jest setup: use fake timers so component timers (e.g. the splash
// screen's navigation timeout) never fire after the test environment has
// been torn down, which would crash the jest worker.
jest.useFakeTimers();
