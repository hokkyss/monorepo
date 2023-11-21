import { HttpClient } from '@monorepo/shared/clients';
import FetchHttpClient from '@monorepo/shared/http-client/fetch';
import { container } from 'tsyringe';

container.register(HttpClient.token, FetchHttpClient);
