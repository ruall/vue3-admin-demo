import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
  login: '/auth/v1/login',
  getDashboard: '/index/dashboard',
  getRank: '/index/merchantRank',
  getOrderView: '/index/orderView',
  countryCode: '/common/queryCountry',
  sendEmail: '/auth/v1/sendEmail'
}

export interface loginParam {
  adminNo: string
  adminPwd: string
  code: string
}

export function login(param: loginParam): Promise<AxiosResponse<IResponse<{}>>> {
  return request(<FetchConfig>{
    url: api.login,
    method: 'post',
    data: param
  })
}

export function getDashboard(): Promise<AxiosResponse<IResponse>> {
  return request({
    url: api.getDashboard,
    method: 'get'
  })
}

export interface rankParam {
  endTime: string
  startTime: string
  type: number
}
export interface orderParam {
  dateCondition: string
}

export function getRank(params: rankParam): Promise<AxiosResponse<IResponse>> {
  return request({
    url: api.getRank,
    method: 'get',
    params
  })
}
export function getOrderView(params: orderParam): Promise<AxiosResponse<IResponse>> {
  return request({
    url: api.getOrderView,
    method: 'get',
    params
  })
}
export function getCountryCode(params: orderParam): Promise<AxiosResponse<IResponse>> {
  return request({
    url: api.countryCode,
    method: 'get',
    params
  })
}
export function sendEmail(data: any): Promise<AxiosResponse<IResponse<{}>>> {
  return request({
    url: api.sendEmail,
    method: 'post',
    data
  })
}
