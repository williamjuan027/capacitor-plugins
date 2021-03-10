import { iosRootViewController } from '@nativescript/capacitor/bridge';

@NativeClass()
class PickerViewDelegate
  extends UIViewController
  implements PHPickerViewControllerDelegate {
  static ObjCProtocols = [PHPickerViewControllerDelegate];

  public pickerDidFinishPicking(
    pickerController: PHPickerViewController,
    result: NSArray<PHPickerResult>
  ) {
    pickerController.dismissModalViewControllerAnimated(true);
    console.log('result', result);

    // TODO:
    // send this information back to parent so parent can resolve the promise
    // check what the image being returned is (type)
  }
}

native.openPhotopicker = () => {
  if (native.isIOS) {
    const config = PHPickerConfiguration.alloc().init();
    config.selectionLimit = 1;
    config.filter = PHPickerFilter.imagesFilter;

    const pickerView = PHPickerViewController.alloc().initWithConfiguration(
      config
    );

    pickerView.delegate = <any>PickerViewDelegate.new();
    iosRootViewController().presentViewControllerAnimatedCompletion(
      pickerView,
      true,
      null
    );
  }
};
