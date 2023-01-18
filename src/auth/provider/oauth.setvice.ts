import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

Injectable();
export class OauthService {
  constructor(private readonly httpService: HttpService) {}
}
