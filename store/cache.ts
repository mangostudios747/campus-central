import db from '~/plugins/lowdb'

export const state = () => ({
  courses: [] as Array<Record<string, any>>,
  updates: [] as Array<Record<string, any>>,
  messages: {
    inbox: [] as Array<Record<string, any>>,
    sent: [] as Array<Record<string, any>>
  },
  theSchedule: {}
})
export type RootState = ReturnType<typeof state>
export const mutations = {


}

export const actions = {

  async refreshValue(ctx: { state: RootState }, key: string, get: () => any) {

      const result = await get();
      db.set(key, result);

      // a value will be sent to the database before setting it in the state,
      // so this is a safe operation
      ctx.state = db.getState();

  }
}
