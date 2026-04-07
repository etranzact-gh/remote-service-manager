export class createDataModel{
    category_id!: string
    channel_id!:string
    institution!: number[]
    phone_number!:string
    pin!:string
    product_code!:string
    service_id!:string
    status!:string
}

export interface createDataResponseModel {
  error: string
  message: string
}

export class Institution{
    
}

export class createAccountsModel{
    name!: string
    phone_number!: string
    role!: string
}

export interface ResponseModel {
  error: string
  message: string
}

export class createCategoryModel{
  name!:string
  description!:string

}

export interface CategoryResponseModel {
  error: string
  message: string
}

export class createInstitutionModel{
  name!:string
  institution_code!:string
}

export interface InstitutionResponseModel {
  error: string
  message: string
}

export class createChannelModel{
  name!:string
  category_id!:string
  url!:string
}

export interface ChannelResponseModel {
  error: string
  message: string
}

export class createProductModel{
  name!:string
  description!:string
  channel!:string
  service_id!:string
  code!:string
}

export interface ProductResponseModel {
  error: string
  message: string
}

export class createServiceModel{
  name!:string
  description!:string
  channel_id!:string
  token!:string
  // category_id!:string
}

export interface ServiceResponseModel {
  error: string
  message: string
}


export class setPinModel{
    confirm_pin!: string
    new_pin!: string
    phone_number!: string
}

export interface setPinResponseModel {
  error: string
  message: string
}

export class changePinModel{
  confirm_pin!:string
  new_pin!:string
  phone_number!:string
  pin!:string
}

export interface changePinResponseModel {
  error: string
  message: string
}


export class blockAccountModel{
  action!:string
  name!: string
  phone_number!:string
}

export interface blockAccountResponseModel {
  error: string
  message: string
}

