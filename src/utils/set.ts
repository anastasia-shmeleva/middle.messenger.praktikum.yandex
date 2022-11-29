import { merge } from "./deepMerge";
import { Indexed } from "./types";

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }
  if (typeof path !== 'string'){
    throw new Error('path must be string')
  }
  let obj = {}
  obj = path.split('.').reduceRight<Indexed>((acc, current, index, array) => ({
    [current]: index === array.length - 1
          ? value
          : acc
    }), obj);
  return merge(object as Indexed, obj)
}
