import Pokemonta3ActorBase from "./actor-base.mjs";

export default class Pokemonta3Trainer extends Pokemonta3ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over stat names and create a new SchemaField for each.
    schema.stats = new fields.SchemaField(Object.keys(CONFIG.pokemonta3.stats).reduce((obj, stat) => {
      obj[stat] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
        mod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        label: new fields.StringField({ required: true, blank: true })
      });
      return obj;
    }, {}));

    // Iterate over skill names and create a new SchemaField for each.
    schema.skills = new fields.SchemaField(Object.keys(CONFIG.pokemonta3.skills).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
        mod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        label: new fields.StringField({ required: true, blank: true })
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through stat scores, and add their modifiers to our sheet output.
    for (const key in this.stats) {
      // Calculate the modifier using d20 rules.
      this.stats[key].mod = Math.floor((this.stats[key].value - 10) / 2);
      // Handle stat label localization.
      this.stats[key].label = game.i18n.localize(CONFIG.pokemonta3.stats[key]) ?? key;
    }

    // Loop through skill scores, and add their modifiers to our sheet output.
    for (const key in this.skills) {
      // Calculate the modifier using d20 rules.
      this.skills[key].mod = Math.floor((this.skills[key].value - 10) / 2);
      // Handle skill label localization.
      this.skills[key].label = game.i18n.localize(CONFIG.pokemonta3.skills[key]) ?? key;
    }

  }

  getRollData() {
    const data = {};

    // Copy the stat scores to the top level, so that rolls can use
    // formulas like `@atk.mod + 4`.
    if (this.stats) {
      for (let [k,v] of Object.entries(this.stats)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Copy the skill scores to the top level, so that rolls can use
    // formulas like `@atk.mod + 4`.
    if (this.skills) {
      for (let [k,v] of Object.entries(this.skills)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
}