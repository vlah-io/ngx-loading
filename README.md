@vlah.io/ngx-worker

CSS loading animations for Angular.

### Available Directives (code example)

The `loading` directive comes in various colour options: 
`dark`, `blue`, `red`, `green`, `brown`, `yellow`, `white` and `darker`.

```
  <td vlahioLoading
      [isVisible]="true|false"
      [align]="left|center|right"
      [color]="vlahio-dark|green|red|..."></td>
```

```
  <div vlahioBouncingDots
       [hideMessage]="true"
       [message]="'Loading...'"
       [isVisible]="true"></div>
```

```
  <div vlahioSlidingDots
       [hideMessage]="true"
       [message]="'Loading...'"
       [isVisible]="true"></div>
```

### Page loading animation (dynamically loaded)

```
  compRef: ComponentRef<PageLoadingWorker>;

  constructor(private pageLoadingWorker: PageLoadingWorker) {
  }

  show(options: DisplayOptionsInterface): void {
  this.compRef = this.pageLoadingWorker.display(options);
  }

  hide(): void {
  this.pageLoadingWorker.destroy(this.compRef);
  }
```

### CSS dependencies

```
    /* You can add global styles to this file, and also import other style files */
    @import "../../ngx-loading/src/assets/css/ngx-loading.css";
    @import "../../ngx-loading/src/assets/css/page-loading.css";
    @import "../../ngx-loading/src/assets/css/sliding-dots.css";
    @import "../../ngx-loading/src/assets/css/bouncing-dots.css";
```
For more details read [here](https://github.com/vlah-io/ngx-loading/blob/master/INSTALLATION.md).
