import { instance } from "../https"

const MEMBERS = {
  GET_All_MEMBERS: (params: number) => instance.get(`https://randomuser.me/api/?results=${params}`)
}

export default MEMBERS