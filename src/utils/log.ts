export function log(target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original = descriptor.value || descriptor.get;
  const logFn = function (...args) {
    console.log(`Call ${key}`);

    return original.apply(this, args);
  };

  if (descriptor.value) {
    descriptor.value = logFn;
  } else {
    descriptor.get = logFn;
  }

  return descriptor;
}
