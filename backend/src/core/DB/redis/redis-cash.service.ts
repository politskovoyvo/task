import { Injectable, Inject, CACHE_MANAGER, Global } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key) {
        await this.cache.get(key);
    }

    async set(key, value) {
        // this.cache.store.setex(key, value);
        await this.cache.set(key, value.toString());
    }

    async del(key, value) {
        await this.cache.del(key);
    }

    getKeys() {
        return this.cache.store.keys();
    }

    private wrap(key) {
        // this.cache.wrap(key, () => {id: )
    }
}
