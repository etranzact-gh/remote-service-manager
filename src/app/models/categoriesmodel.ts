export class CategoriesModel{
    channel_id!: string;
    status!:string
}

export class CategoriesItemModel{
    name!:string
    description!:string
}

export interface CategoriesResponseModel {
  error: string
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  name: string
  description: any
}

export class InstitutionsModel{}

export class InstitutionsIemModel{
    name!:string
    institution_code!:string
}

export interface InstitutionsResponseModel {
  error: string
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  name: string
  institution_code: string
}

export class ServicesModel{
  channel_id!: string;
   status!:string;
}

export class ServicesItemModel{
    name!:string
    description!:string
    token!:string
    channel_id!:string
}

export interface ServicesResponseModel {
  error: string
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  name: string
  description: any
  token: string
  channel_id: string
}


export class ProductsModel{
    channel_id!: string;
    service_id!:string;
    status!:string;
}

export class ProductsItemModel{
    name!:string
    description!:string
    channel!:string
    service_id!:string
    channel_id!:string
    code!:string
}

export interface ProductsResponseModel {
  error: string
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  name: string
  description: any
  channel_id: string
  service_id: string
  code: string
}

export class ChannelsModel{
    category_id!:string
    status!:string
}

export class ChannelItemModel{
 name!: string
 url!: string
 category_id!:string
}

export interface ChannelsResponseModel {
  error: string
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  name: string
  category_id: string
  url: string
}


export class AccountsModel{
    phone_number!:string
    status!:string
}

export class AccountsItemmodel{
    name!:string
    role!:string
    phone_number!:string
    attempts!:string
    status!:string
    created!:string
    updated!:string
}


export interface AccountsResponseModel {
  error: string
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  phone_number: string
  name: string
  role: string
  attempts: number
  status: string
  created: string
  updated?: string
}


export class updateServiceModel{
  channel_id!:string
  description!:string
  id!: number
  name!:string
  token!:string
}

export interface updateServiceResponseModel {
  error: string
  message: string
}

export class updateProductModel{
  channel_id!:string
  description!:string
  id!: number
  code!:string
  name!:string
  service_id!: string
}

export interface updateProductResponseModel {
  error: string
  message: string
}

export class updateChannelModel{
  category_id!:string
  description!:string
  id!: number
  url!:string
  name!:string
}

export interface updateChannelResponseModel {
  error: string
  message: string
}


export class updateInstitutionModel{
  id!: number
  name!:string
  institution_code!:string
}

export interface updateInstitutionResponseModel {
  error: string
  message: string
}

export class updateCategoryModel{
  id!: number
  name!:string
 description!:string
}

export interface updateCategorynResponseModel {
  error: string
  message: string
}


export class deleteServiceModel{
  id!: number
}

export interface deleteServiceResponseModel {
  error: string
  message: string
}

export class deleteAccountModel{
  id!: number
}

export interface deleteAccountResponseModel {
  error: string
  message: string
}

export class deleteChannelModel{
  id!: number
}

export interface deleteChannelResponseModel {
  error: string
  message: string
}

export class deleteProductModel{
  id!: number
}

export interface deleteProductResponseModel {
  error: string
  message: string
}

export class deleteCategoryModel{
  id!: number
}

export interface deleteCategoryResponseModel {
  error: string
  message: string
}

export class deleteInstitutionModel{
  id!: number
}

export interface deleteInstitutionResponseModel {
  error: string
  message: string
}