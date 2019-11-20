import {Model} from 'radiks';

export class Entry extends Model {
  static className = 'entry';

  static schema = {
    name: {
      type: String
    },
    pass: {
      type: String
    },
    username: {
      type: String
    },
    notes: {
      type: String
    },
    status: {
      type: Number,
      decrypted: true
    },
  }
}
