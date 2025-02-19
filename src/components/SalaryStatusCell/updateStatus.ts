"use server"

import { getPayload } from "payload"
import config from "@payload-config"

import { Salary } from "@/payload-types"
import { Success } from "node_modules/@payloadcms/ui/dist/providers/ToastContainer/icons/Success"

export const updateStatus = async (id: number, status: Salary["status"]) => {

  try {

    const payload = await getPayload({ config })
    await payload.update({
      collection: "salary",
      id,
      data: {
        status
      }
    })

    return {
      success: true,
      error: false,
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: true,
    }
  }

}