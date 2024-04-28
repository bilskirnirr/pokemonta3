import Pokemonta3ItemBase from "./item-base.mjs";

export default class Pokemonta3Spell extends Pokemonta3ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.spellLevel = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 9 });

    return schema;
  }
}