import { Inject, Injectable } from '@nestjs/common';
import { REDIS_PUB, REDIS_SUB } from './redis.constants';
import { RedisClient } from './redis.providers';
import { Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface IRedisMessage {
    readonly message: string;
    readonly channel: string;
}

@Injectable()
export class RedisService {
    public constructor(
        @Inject(REDIS_SUB) private readonly _redisSubscriber: RedisClient,
        @Inject(REDIS_PUB) private readonly _redisPublisher: RedisClient,
    ) {}

    public on<T>(event: string): Observable<T> {
        this._redisSubscriber.subscribe(event);

        return Observable.create((observer: Observer<IRedisMessage>) =>
            this._redisSubscriber.on('message', (channel, message) =>
                observer.next({
                    channel,
                    message,
                }),
            ),
        ).pipe(
            filter(({ channel }) => channel === event),
            map(({ message }) => JSON.parse(message)),
        );
    }

    public async publish(channel: string, value: unknown): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            return this._redisSubscriber.publish(
                channel,
                JSON.stringify(value),
                (error, retry) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(retry);
                },
            );
        });
    }
}
