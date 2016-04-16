//
//  ARViewManager.m
//  AirMsgProject
//
//  Created by Dasha on 14/04/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ARViewManager.h"
#import "ViewController.h"

@implementation ARViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    ViewController* controller = [[ViewController alloc] init];
    return [controller start];
}

@end