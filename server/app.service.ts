import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Repository } from 'typeorm';
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
  ) {
    this.fillGeoCode();
  }

  async getHello(params?: SearchParams) {
    const res = await this.repo.find({
      where:
        params?.from && params?.to
          ? { date: Between(params?.from, params?.to) }
          : undefined,
      order: { date: 'DESC' },
    });
    return res.map(({ id, date, name, address, lat, lng, count }) => ({
      id,
      name,
      address,
      count,
      date,
      latLng: { lat, lng },
    }));
  }

  async fillGeoCode() {
    const res = await this.repo.find({
      where: { lat: IsNull(), lng: IsNull() },
    });
    await Promise.all(
      res.map(async (x) => {
        const latlng = await this.geocode(x.address);
        await this.repo.update(
          { id: x.id },
          { lat: latlng.lat, lng: latlng.lng },
        );
      }),
    );
  }

  async geocode(address: string) {
    const geoCode = await this.client.geocode({
      params: { key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, address },
    });
    return geoCode?.data?.results?.[0].geometry.location || null;
  }
}
