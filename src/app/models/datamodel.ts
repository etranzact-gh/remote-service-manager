 export class DataModel{
 status!: string
 channel_id!:string
}

export class DataItemModel{
  name!:string
  product_code!:string
  channel_id!:string
  status!:string
}

export interface DataResponseModel {
  error: string
  message: string
  data: Data
}

export interface Data {
  products: Product[]
  accounts: string[]
}

export interface Product {
  name: string
  token: string
  product_code: string
  service_id: string
  channel_id: string
  category_id: string
  status: string
  status_message: any
  blacklist: any[]
}

export class logoutModel{}

export interface logoutResponseModel {
  code: string
  message: string
}
