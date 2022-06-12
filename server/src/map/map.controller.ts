import { Controller, Get, Param } from '@nestjs/common';

@Controller('map')
export class MapController {
  @Get('/search/:q')
  async getPlaces(@Param('q') query: string): Promise<{ places: string[] }> {
    return { places: [query] };
  }
}
