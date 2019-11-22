import {Model} from 'radiks';

export class Entry extends Model {
  static className = 'entry';

  static schema = {
    name: {
      type: String
    },
    username: {
      type: String
    },
    pass: {
      type: String
    },
    notes: {
      type: String
    },
    status: {
      type: Number
    },
    type: {
      type: Number
    },
  }
}
