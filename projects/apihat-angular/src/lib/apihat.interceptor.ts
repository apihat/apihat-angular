import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class ApiHatInterceptor implements HttpInterceptor {
    private batch: any[] = [];
    private readonly batchInterval = 5000; // 5 seconds
    private readonly apiUrl: string = 'https://apihat.com';

    constructor() {
        // Send batched logs every batchInterval
        setInterval(() => {
            if (this.batch.length > 0) {
                this.sendBatch();
            }
        }, this.batchInterval);
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event) => {
                const raw =
                    {
                        "secretKey": "API_KEY",
                        "version": "1.0",
                        "sdk": "java",
                        "data": {
                            "server": {
                                "timezone": "timezone",
                                "os": {
                                    "name": "chrome",
                                    "release": "1.3.414",
                                    "architecture": "unix"
                                },
                                "software": null,
                                "signature": null,
                                "protocol": null
                            },
                            "request": {
                                "timestamp": "2025-05-25, 16:13:43",
                                "ip": "192.168.0.1",
                                "url": "https://apihat.com",
                                "user_agent": "",
                                "method": "POST",
                                "headers": {},
                                "body": {}
                            },
                            "response": {
                                "headers": {},
                                "code": "200",
                                "size": "15kb",
                                "load_time": "30ms",
                                "body": {}
                            },
                            "errors": {}
                        }
                    }

                this.batch.push(raw);
            })
        );
    }

    // Send batched logs to API Hat
    private sendBatch() {
        fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer token`
            },
            body: JSON.stringify(this.batch),
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('Failed to send logs', response);
                }
            })
            .catch((error) => {
                console.error('Error sending logs', error);
            });

        this.batch = [];
    }
}

