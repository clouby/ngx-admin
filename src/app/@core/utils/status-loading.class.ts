import { BehaviorSubject } from 'rxjs';

export class StatusLoading {
    private loading: BehaviorSubject<boolean>;

    constructor(loading: boolean) {
        this.loading = new BehaviorSubject<boolean>(loading);
    }

    reset_load = () => {
        this.loading.next(true);
    }

    end_load = () => {
        this.loading.next(false);
    }

    get g_loading() {
        return this.loading;
    }

    set s_loading(data: boolean) {
        this.loading.next(data);
    }

    toggle_loading() {
        const load = !this.loading.getValue();
        this.loading.next(load);
    }

}
