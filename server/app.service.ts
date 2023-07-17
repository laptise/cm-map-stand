import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CmPositionEntity } from './_entities/cm-position.entity';
import { Client } from '@googlemaps/google-maps-services-js';
import { GoogleMapsClientSybmol } from './_entities/_constants';
import { SearchParams } from './input/search-params.input.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CmPositionEntity)
    private readonly repo: Repository<CmPositionEntity>,
    @Inject(GoogleMapsClientSybmol)
    private readonly client: Client,
  ) {}
  async getHello(params?: SearchParams) {
    const res = await this.repo.find({
      where:
        params?.from && params?.to
          ? { date: Between(params?.from, params?.to) }
          : undefined,
      order: { date: 'DESC' },
    });
    const geoCodes = await Promise.all(
      res.map(async (item) => ({
        ...item,
        latLng: await this.geocode(item.address),
      })),
    );
    return geoCodes;
  }

  async geocode(address: string) {
    const geoCode = await this.client.geocode({
      params: { key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, address },
    });
    return geoCode?.data?.results?.[0].geometry.location || null;
  }
}
