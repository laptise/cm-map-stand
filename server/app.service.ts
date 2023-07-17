import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmPositionEntity } from './_entities/cm-position.entity';
import { Client } from '@googlemaps/google-maps-services-js';
import { GoogleMapsClientSybmol } from './_entities/_constants';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CmPositionEntity)
    private readonly repo: Repository<CmPositionEntity>,
    @Inject(GoogleMapsClientSybmol)
    private readonly client: Client,
  ) {}
  async getHello() {
    const res = await this.repo.find();
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
